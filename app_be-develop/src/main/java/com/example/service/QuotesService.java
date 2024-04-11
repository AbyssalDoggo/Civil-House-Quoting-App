package com.example.service;

import com.example.common.cnst.CoreConst;
import com.example.common.service.AbstractService;
import com.example.common.util.DateUtils;
import com.example.dac.dao.QuotesDao;
import com.example.dac.dao.QuotesDetailDao;
import com.example.dac.dao.SeqQuoteCodeDao;
import com.example.dac.entity.Quotes;
import com.example.dac.entity.QuotesDetail;
import com.example.dto.QuotesDetailInDto;
import com.example.dto.QuotesInDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class QuotesService extends AbstractService {

    private final QuotesDao quotesDao;
    private final QuotesDetailDao quotesDetailDao;
    private final SeqQuoteCodeDao seqQuoteCodeDao;

    @Transactional(rollbackFor = Throwable.class)
    public void save(QuotesInDto inDto) {
        int id = seqQuoteCodeDao.selectNextVal();

        Quotes quotes = new Quotes();
        quotes.setQuotesId(String.valueOf(id));
        quotes.setUserName(inDto.getUserName());
        quotes.setUserPhoneNumber(inDto.getUserPhoneNumber());
        quotes.setProjectLandArea(inDto.getProjectLandArea());
        quotes.setProjectBuildArea(inDto.getProjectBuildArea());
        quotes.setProjectFloor(inDto.getProjectFloor());
        quotes.setSelectedPackage(inDto.getSelectedPackage());
        quotes.setUnitPrice(inDto.getUnitPrice());
        quotes.setTotalFloorArea(inDto.getTotalFloorArea());
        quotes.setTotalPrice(inDto.getTotalPrice());
        quotes.setCreateDatetime(LocalDateTime.now());
        quotesDao.insert(quotes);

        int count = 0;
        if(inDto.getQuotesDetail() != null){
            QuotesDetail quotesDetail;
            for(QuotesDetailInDto item: inDto.getQuotesDetail()){
                count++;
                quotesDetail = new QuotesDetail();
                quotesDetail.setQuotesId(String.valueOf(id));
                quotesDetail.setDetailNo(String.valueOf(count));
                quotesDetail.setCategory(item.getCategory());
                quotesDetail.setSelectedCategory(item.getSelectedCategory());
                quotesDetail.setCoefficient(item.getCoefficient());
                quotesDetail.setBuildArea(item.getBuildArea());
                quotesDetail.setCost(item.getCost());
                quotesDetailDao.insert(quotesDetail);
            }
        }
    }

    public List<QuotesInDto> get() {
        List<Quotes> quotes = quotesDao.selectAllQuotes();
        List<QuotesInDto> outDto = new ArrayList<>();
        for(Quotes item: quotes){
            QuotesInDto i = new QuotesInDto();
            i.setKey(item.getQuotesId());
            i.setId(item.getQuotesId());
            i.setQuotesId(item.getQuotesId());
            i.setUserName(item.getUserName());
            i.setUserPhoneNumber(item.getUserPhoneNumber());
            i.setProjectLandArea(item.getProjectLandArea());
            i.setProjectBuildArea(item.getProjectBuildArea());
            i.setProjectFloor(item.getProjectFloor());
            i.setSelectedPackage(item.getSelectedPackage());
            i.setUnitPrice(item.getUnitPrice());
            i.setTotalFloorArea(item.getTotalFloorArea());
            i.setTotalPrice(item.getTotalPrice());
            i.setCreateDatetime(DateUtils.getFormattedLocalDateTime(item.getCreateDatetime(), CoreConst.DATE_FORMAT_DD_MM_YYYY_HH_MM));

            List<QuotesDetailInDto> quotesDetail = new ArrayList<>();
            List<QuotesDetail> selectByCondition = quotesDetailDao.selectByCondition(item.getQuotesId());
            for(QuotesDetail quote: selectByCondition){
                QuotesDetailInDto quotesDetailInDto = new QuotesDetailInDto();
                quotesDetailInDto.setQuotesId(quote.getQuotesId());
                quotesDetailInDto.setDetailNo(quote.getDetailNo());
                quotesDetailInDto.setCategory(quote.getCategory());
                quotesDetailInDto.setSelectedCategory(quote.getSelectedCategory());
                quotesDetailInDto.setCoefficient(quote.getCoefficient());
                quotesDetailInDto.setBuildArea(quote.getBuildArea());
                quotesDetailInDto.setCost(quote.getCost());
                quotesDetail.add(quotesDetailInDto);
            }
            i.setQuotesDetail(quotesDetail);
            outDto.add(i);
        }
        return outDto;
    }
}
