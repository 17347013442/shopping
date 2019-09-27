package com.yc.po;

public class GoodPO {

	private Integer gno ;// 商品编号
	private String gname ;// 商品名称
	private Integer tino ;// 所属类型
	private Double price ;// 商品单价
	private String intro ;// 商品简介 
	private Integer balance ;// 商品库存
	private String unit;// 商品单位
	private String place ;// 商品产地
	private String qualityPeriod ;// 保质期
	private Double weight ;// 净重
	private String pics ;// 商品图片
	private String descr ;// 商品描述
	private double inprice;//进价
	private Integer status;//状态
	public Integer getGno() {
		return gno;
	}
	public void setGno(Integer gno) {
		this.gno = gno;
	}
	public String getGname() {
		return gname;
	}
	public void setGname(String gname) {
		this.gname = gname;
	}
	public Integer getTino() {
		return tino;
	}
	public void setTino(Integer tino) {
		this.tino = tino;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public String getIntro() {
		return intro;
	}
	public void setIntro(String intro) {
		this.intro = intro;
	}
	public Integer getBalance() {
		return balance;
	}
	public void setBalance(Integer balance) {
		this.balance = balance;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	public String getQualityPeriod() {
		return qualityPeriod;
	}
	public void setQualityPeriod(String qualityPeriod) {
		this.qualityPeriod = qualityPeriod;
	}
	public Double getWeight() {
		return weight;
	}
	public void setWeight(Double weight) {
		this.weight = weight;
	}
	public String getPics() {
		return pics;
	}
	public void setPics(String pics) {
		this.pics = pics;
	}
	public String getDescr() {
		return descr;
	}
	public void setDescr(String descr) {
		this.descr = descr;
	}
	@Override
	public String toString() {
		return "GoodPO [gno=" + gno + ", gname=" + gname + ", tino=" + tino + ", price=" + price + ", intro=" + intro
				+ ", balance=" + balance + ", unit=" + unit + ", place=" + place + ", qualityPeriod=" + qualityPeriod
				+ ", weight=" + weight + ", pics=" + pics + ", descr=" + descr + "]";
	}
	
	
}
