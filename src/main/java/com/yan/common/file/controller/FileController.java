package com.yan.common.file.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yan.common.file.mapper.FileMapper;
import com.yan.common.user.mapper.SysUserMapper;
import com.yan.core.annotation.MapperInject;
import com.yan.core.controller.BaseController;
import com.yan.core.model.PageModel;

/**
 * 文件列表管理
 * @author bigbug
 *
 */
@Controller
@RequestMapping("/common/file")
public class FileController extends BaseController {
	
	
	@MapperInject(FileMapper.class)
	private FileMapper mapper;
	
	@RequestMapping("/manage")
	public String manage() {
		return "common/file/manage";
	}

	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseBody
	public PageModel<HashMap<String,Object>> list(@RequestParam HashMap<String,Object> params) {
		PageModel pageModel = new PageModel();
		String offset =(String) params.get("offset");
		String limit =(String) params.get("limit");
		Integer iter =Integer.parseInt(offset);
		Integer limitInt =Integer.parseInt(limit);
		String end =(iter+limitInt)+"";
		params.put("limit", end);
		//查询列表
		List<HashMap<String,Object>> listResult =mapper.queryFileList(params);
		//统计查询
	    Integer count=	mapper.queryFileCount( params);
	    pageModel.setRows(listResult);
	    pageModel.setTotal(count);
	    return pageModel;
	}


}
