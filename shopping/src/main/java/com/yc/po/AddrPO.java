package com.yc.po;

public class AddrPO {

	private Integer ano ;// 地址编号
	private Integer mno ;// 会员编号
	private String name ;// 收货人姓名
	private String tel ;// 收货人联系方式
	private String province ;// 省
	private String city ;// 市
	private String area ;// 区
	private String addr ;// 详细地址楼栋门牌信息
	private Integer status ;// 是否是默认收获地址
	public Integer getAno() {
		return ano;
	}
	public void setAno(Integer ano) {
		this.ano = ano;
	}
	public Integer getMno() {
		return mno;
	}
	public void setMno(Integer mno) {
		this.mno = mno;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "AddrPO [ano=" + ano + ", mno=" + mno + ", name=" + name + ", tel=" + tel + ", province=" + province
				+ ", city=" + city + ", area=" + area + ", addr=" + addr + ", status=" + status + "]";
	}
	
	
}
