package com.yc.dao;

import java.util.List;

import com.yc.po.GoodPO;
import com.yc.po.TypeItemPO;
import com.yc.po.TypePO;

public interface TypeMapper {
	//查看全部
 public List<TypePO> findAll();
 
 //按照tno查找对应的二级目录
 public List<TypeItemPO> findByTno(int tno);
 

}
