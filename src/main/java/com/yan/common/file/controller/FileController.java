package com.yan.common.file.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.yan.common.file.mapper.FileMapper;
import com.yan.common.login.model.LoginUser;
import com.yan.common.user.mapper.SysUserMapper;
import com.yan.common.util.UUIDHexGenerator;
import com.yan.core.annotation.MapperInject;
import com.yan.core.controller.BaseController;
import com.yan.core.model.MsgModel;
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

	
	/**
	 * @throws IOException 
	 * @throws IllegalStateException 
	 * @方法描述: 文件上传
	 * @作者： 易涛  
	 * @时间： 2018年5月21日上午11:59:43  
	 * @参数 @param params
	 * @参数 @return  
	 * @返回类型： MsgModel
	 */
	@RequestMapping(value = "/uploadImage", method = RequestMethod.POST)
	@ResponseBody
	public MsgModel uploadImage(@RequestParam("file") MultipartFile file) throws IllegalStateException, IOException {
		//公司的Id
        if(!file.isEmpty()) {
        	//根据sessionid 设置上传路径，退出之后普通用户无法 看到上传过的文件
        	String showPath = "images/"+this.getSession().getId()+"/"; 
            //上传文件路径
            String realPath = "images/"+this.getSession().getId()+"/";
            File dirFile = new File(realPath);
            //如果目录不存在，就创建目录
            if(!dirFile.exists()){
            	dirFile.mkdirs();
            }
            //得到上传的文件名称
            String filename = file.getOriginalFilename();
            //生成新的文件名称
            String newFileName = System.currentTimeMillis()+"."+filename.split("\\.")[1];
            //将上传文件保存到一个目标文件当中
            file.transferTo(new File(realPath + File.separator + newFileName));
            return this.resultMsg("0", showPath+newFileName);
        } else{
        	return this.resultMsg("-1", "上传失败！");
        }
	}
	
	/**
	 * @方法描述: 保存司机信息
	 * @作者： 易涛  
	 * @时间： 2018年5月21日上午11:59:43  
	 * @参数 @param params
	 * @参数 @return  
	 * @返回类型： MsgModel
	 */
	@RequestMapping(value = "/insertFile", method = RequestMethod.POST)
	@ResponseBody
	public MsgModel insertFile(@RequestParam HashMap<String,Object> params) {
		LoginUser loginUser = this.getSessionUser();
		params.put("userName", loginUser.getUserName());
		params.put("id", UUIDHexGenerator.generator());
		Integer rows  = mapper.insertFile(params);
		if(rows >0){
			return this.resultMsg("0", "文件入库成功！", rows);
		}else{
			return this.resultMsg("-1", "文件入库失败！");
		}
	}
	
	

	
	/**
	 * 将获取的数据导出到excel中
	 * 
	 * @param params
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/dowland", method = RequestMethod.GET)
	@ResponseBody
	public void dowland(@RequestParam HashMap<String, Object> params, HttpServletResponse response)
			throws Exception {
		try {
			String filePath =(String) params.get("filePath");
			String arg[]=filePath.split(",");
			 InputStream is = new FileInputStream(filePath);
			response.setContentType("application/x-download");// 下面三行是关键代码，处理乱码问题
			response.setCharacterEncoding("utf-8");
			response.setHeader("Content-Disposition",
					"attachment;filename=" + new String(arg[arg.length-1].getBytes("gbk"), "iso8859-1"));
			OutputStream out = response.getOutputStream();
			int data;
			while(is.available() > 0)
			 {
			 data = is.read();
			 out.write(data);
			 }
			 is.close();
			 out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
