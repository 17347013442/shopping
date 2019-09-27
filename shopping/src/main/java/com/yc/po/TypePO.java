package com.yc.po;

import java.util.List;

public class TypePO {

	private Integer tno ;
	private String tname ;
	private Integer status ;
	private List<TypeItemPO> typeItem;
	private List<GoodPO> glist;
	public List<GoodPO> getGlist() {
		return glist;
	}
	public void setGlist(List<GoodPO> glist) {
		this.glist = glist;
	}
	public Integer getTno() {
		return tno;
	}
	public void setTno(Integer tno) {
		this.tno = tno;
	}
	public String getTname() {
		return tname;
	}
	public void setTname(String tname) {
		this.tname = tname;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public List<TypeItemPO> getTypeItem() {
		return typeItem;
	}
	public void setTypeItem(List<TypeItemPO> typeItem) {
		this.typeItem = typeItem;
	}
	@Override
	public String toString() {
		return "TypePO [tno=" + tno + ", tname=" + tname + ", status=" + status + ", typeItem=" + typeItem + ", glist="
				+ glist + "]";
	}

	
	
	
}
