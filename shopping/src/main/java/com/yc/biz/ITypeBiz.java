package com.yc.biz;

import java.util.List;

import com.yc.po.TypeItemPO;
import com.yc.po.TypePO;

public interface ITypeBiz {
	//查找所有并按照tno查找对应的二级目录
public List<TypePO> findAll();

//按照tno查找所有的子类型
public List<TypeItemPO> findByTno(int tno);


//查找所有父类型
public List<TypePO> findType();
}
