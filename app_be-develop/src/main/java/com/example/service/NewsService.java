package com.example.service;

import com.example.common.cnst.CoreConst;
import com.example.common.service.AbstractService;
import com.example.common.util.DateUtils;
import com.example.dac.dao.NewsDao;
import com.example.dac.dao.SeqNewsCodeDao;
import com.example.dac.entity.News;
import com.example.dto.NewsInDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class NewsService extends AbstractService {

    private final NewsDao newsDao;
    private final SeqNewsCodeDao seqNewsCodeDao;

    @Transactional(rollbackFor = Throwable.class)
    public void save(NewsInDto inDto) {

        int id = seqNewsCodeDao.selectNextVal();

        News news = new News();
        news.setNewsId(String.valueOf(id));
        news.setTitle(inDto.getTitle());
        news.setImageUrl(inDto.getImageUrl());
        news.setWrittenBy(inDto.getWrittenBy());
        news.setBody(inDto.getBody());
        news.setCreateDatetime(LocalDateTime.now());
        newsDao.insert(news);
    }

    public List<NewsInDto> get() {
        List<News> news = newsDao.selectAllNews();
        List<NewsInDto> outDto = new ArrayList<>();
        for(News item: news){
            NewsInDto i = new NewsInDto();
            i.setId(item.getNewsId());
            i.setTitle(item.getTitle());
            i.setImageUrl(item.getImageUrl());
            i.setWrittenBy(item.getWrittenBy());
            i.setBody(item.getBody());
            i.setCreatedAt(DateUtils.getFormattedLocalDateTime(item.getCreateDatetime(), CoreConst.DATE_FORMAT_DD_MM_YYYY_HH_MM));
            outDto.add(i);
        }
        return outDto;
    }

    public NewsInDto getOne(NewsInDto inDto) {
        News news = newsDao.selectById(inDto.getId());
        NewsInDto i = new NewsInDto();
        i.setTitle(news.getTitle());
        i.setImageUrl(news.getImageUrl());
        i.setWrittenBy(news.getWrittenBy());
        i.setBody(news.getBody());
        i.setCreatedAt(DateUtils.getFormattedLocalDateTime(news.getCreateDatetime(), CoreConst.DATE_FORMAT_DD_MM_YYYY_HH_MM) );
        return i;
    }

    @Transactional(rollbackFor = Throwable.class)
    public void delete(NewsInDto inDto) {
        newsDao.deleteByCondition(inDto.getId());
    }

}
