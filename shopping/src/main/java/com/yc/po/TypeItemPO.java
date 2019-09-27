package com.yc.po;

public class TypeItemPO {

	private Integer tino ;
	private String tname ; 
	private Integer tno ;// 所属一级分类
	private Integer status ;//状态
	public Integer getTino() {
		return tino;
	}
	public void setTino(Integer tino) {
		this.tino = tino;
	}
	public String getTname() {
		return tname;
	}
	public void setTname(String tname) {
		this.tname = tname;
	}
	public Integer getTno() {
		return tno;
	}
	public void setTno(Integer tno) {
		this.tno = tno;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "TypeItemPO [tino=" + tino + ", tname=" + tname + ", tno=" + tno + ", status=" + status + "]";
	}
	
	
}
