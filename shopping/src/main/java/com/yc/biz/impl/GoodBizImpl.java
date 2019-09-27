package com.yc.biz.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yc.biz.IGoodBiz;
import com.yc.dao.GoodMapper;
import com.yc.po.GoodPO;
import com.yc.po.TypeItemPO;
import com.yc.po.TypePO;
@Service
public class GoodBizImpl implements IGoodBiz {
	@Autowired
private GoodMapper mapper;
	@Override
	public List<GoodPO> findByItem(GoodPO po) {
		List<GoodPO> list=new ArrayList<GoodPO>();
		list=mapper.findByItem(po);
		if(list!=null) {
			return list;
		}
		return null;
	}
	@Override
	public List<TypePO> findByTno(TypeItemPO po) {
		List<TypePO> list=new ArrayList<TypePO>();
		
		list=mapper.findByTno(po);
		if(list!=null) {
			return list;
		}
		return null;
	}
	@Override
	public int add(GoodPO po) {
		
		return mapper.addGood(po);
	}
	@Override
	public List<GoodPO> findByPage(int page, int size, GoodPO po) {
		List<GoodPO> list=new ArrayList<GoodPO>();
		 list=mapper.findByPage(page, size, po);
		 if(list!=null) {
				return list;
			}
			return null;
	}

}
