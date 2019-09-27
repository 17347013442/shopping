package com.yc.biz.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yc.biz.ITypeBiz;
import com.yc.dao.TypeMapper;
import com.yc.po.TypeItemPO;
import com.yc.po.TypePO;
@Service
public class TypeBizImpl implements ITypeBiz {
@Autowired
private TypeMapper mapper;
	@Override
	
	 public List<TypePO> findAll() {
		List<TypePO> tlist=mapper.findAll();
		if(tlist!=null) {
			for(TypePO po:tlist) {
				List<TypeItemPO>list=new ArrayList<>();
				list=mapper.findByTno(po.getTno());
				po.setTypeItem(list);
			}
			return tlist;
		}
		return null;
	}
	@Override
	public List<TypeItemPO> findByTno(int tno) {
		List<TypeItemPO>list=mapper.findByTno(tno);
		if(list!=null) {
			return list;
		}
		
		return null;
	}
	@Override
	public List<TypePO> findType() {
		List<TypePO> list=mapper.findAll();
		if(list!=null && list.size()>0) {
			return list;
		}
		return null;
	}
	
	

}
