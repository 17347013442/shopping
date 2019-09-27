package com.yc.biz;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.yc.po.GoodPO;
import com.yc.po.TypeItemPO;
import com.yc.po.TypePO;

public interface IGoodBiz {
	//添加商品
	public int add(GoodPO po);
	
	//根据条件查询商品
		public List<GoodPO> findByItem(GoodPO po);
		
		//根据tno查询商品种类和商品
		public List<TypePO> findByTno(TypeItemPO po);
		
		//分页查询
	    public List<GoodPO> findByPage(int page,int size, GoodPO po);
}
