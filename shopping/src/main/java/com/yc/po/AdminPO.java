package com.yc.po;

import java.io.Serializable;

public class AdminPO implements Serializable {

	private Integer aid;// 管理员编号
	private String aname ;// 管理员昵称
	private String pwd;//管理员密码
	private String tel;// 手机号码
	private Integer status;//管理员状态0禁用,1启用
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Integer getAid() {
		return aid;
	}
	public void setAid(Integer aid) {
		this.aid = aid;
	}
	public String getAname() {
		return aname;
	}
	public void setAname(String aname) {
		this.aname = aname;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	@Override
	public String toString() {
		return "AdminPO [aid=" + aid + ", aname=" + aname + ", pwd=" + pwd + ", tel=" + tel + "]";
	}
	
	
	
}
