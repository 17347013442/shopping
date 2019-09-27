/**
 * 
 */
package com.yc.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yc.biz.ITypeBiz;
import com.yc.po.TypeItemPO;
import com.yc.po.TypePO;

/**
 * @author admin
 *
 */
@Controller
@RequestMapping("/type")
public class TypeController {
@Autowired
private ITypeBiz typeBizImpl;
@RequestMapping("/findAll")
@ResponseBody
public List<TypePO> findAll(){
	List<TypePO> tlist=new ArrayList<TypePO>();
	 tlist=typeBizImpl.findAll();	
	return tlist;
}

@RequestMapping("/findByTno")
@ResponseBody
public List<TypeItemPO> findByTno(int tno){
	List<TypeItemPO> tlist=new ArrayList<TypeItemPO>();
	 tlist=typeBizImpl.findByTno(tno);
	return tlist;
}

@RequestMapping("/findType")
@ResponseBody
public List<TypePO> findType(){
	List<TypePO> list=new ArrayList<TypePO>();
	 list=typeBizImpl.findType();
	return list;
}
}
