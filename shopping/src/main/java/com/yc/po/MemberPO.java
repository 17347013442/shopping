package com.yc.po;

public class MemberPO {

	private Integer mno;
	private String nickname;
	private String pwd  ;// 密码
	private String tel;// 手机号码
	private String email ;// 邮箱	
	private String sex ;
	private String regDate ;//注册日期
	private Integer status;//账号状态
	public Integer getMno() {
		return mno;
	}
	public void setMno(Integer mno) {
		this.mno = mno;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "MemberPO [mno=" + mno + ", nickname=" + nickname + ", pwd=" + pwd + ", tel=" + tel + ", email=" + email
				+ ", sex=" + sex + ", regDate=" + regDate + ", status=" + status + "]";
	}
	
	
}
