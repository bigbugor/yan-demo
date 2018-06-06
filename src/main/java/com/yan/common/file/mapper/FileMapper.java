package com.yan.common.file.mapper;

import java.util.HashMap;
import java.util.List;

public interface FileMapper {

	List<HashMap<String, Object>> queryFileList(HashMap<String, Object> params);

	Integer queryFileCount(HashMap<String, Object> params);

	Integer insertFile(HashMap<String, Object> params);

}
