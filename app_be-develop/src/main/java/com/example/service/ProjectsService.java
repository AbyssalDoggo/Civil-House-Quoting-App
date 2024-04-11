package com.example.service;

import com.example.common.service.AbstractService;
import com.example.dac.dao.ProjectsDao;
import com.example.dac.dao.SeqProjectCodeDao;
import com.example.dac.entity.Projects;
import com.example.dto.ProjectsInDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ProjectsService extends AbstractService {

    private final ProjectsDao projectsDao;
    private final SeqProjectCodeDao seqProjectCodeDao;

    @Transactional(rollbackFor = Throwable.class)
    public void save(ProjectsInDto inDto) {

        int id = seqProjectCodeDao.selectNextVal();

        Projects projects = new Projects();
        projects.setProjectsId(String.valueOf(id));
        projects.setTitle(inDto.getTitle());
        projects.setArchitect(inDto.getArchitect());
        projects.setArea(inDto.getArea());
        projects.setYear(inDto.getYear());
        projects.setImageUrl(inDto.getImageUrl());
        projects.setBody(inDto.getBody());
        projects.setCreateDatetime(LocalDateTime.now());
        projectsDao.insert(projects);
    }

    public List<ProjectsInDto> get() {
        List<Projects> projects = projectsDao.selectAllProjects();
        List<ProjectsInDto> outDto = new ArrayList<>();
        for(Projects item: projects){
            ProjectsInDto i = new ProjectsInDto();
            i.setId(item.getProjectsId());
            i.setTitle(item.getTitle());
            i.setArchitect(item.getArchitect());
            i.setArea(item.getArea());
            i.setYear(item.getYear());
            i.setImageUrl(item.getImageUrl());
            i.setBody(item.getBody());
            outDto.add(i);
        }
        return outDto;
    }

    public ProjectsInDto getOne(ProjectsInDto inDto) {
        Projects projects = projectsDao.selectById(inDto.getId());
        ProjectsInDto i = new ProjectsInDto();
        i.setId(projects.getProjectsId());
        i.setTitle(projects.getTitle());
        i.setArchitect(projects.getArchitect());
        i.setArea(projects.getArea());
        i.setYear(projects.getYear());
        i.setImageUrl(projects.getImageUrl());
        i.setBody(projects.getBody());

        return i;
    }

    @Transactional(rollbackFor = Throwable.class)
    public void delete(ProjectsInDto inDto) {
        projectsDao.deleteByCondition(inDto.getId());
    }

}
