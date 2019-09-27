package com.yc.po;

public class CommentPO {

	private Integer cno;// 评论编号
	private Integer oino;// 订单详细编号
	private Integer score;// 评分
	private String cdate;// 评论时间
	private String pics;// 商品实物图片
	private String content;// 评论内容
	public Integer getCno() {
		return cno;
	}
	public void setCno(Integer cno) {
		this.cno = cno;
	}
	public Integer getOino() {
		return oino;
	}
	public void setOino(Integer oino) {
		this.oino = oino;
	}
	public Integer getScore() {
		return score;
	}
	public void setScore(Integer score) {
		this.score = score;
	}
	public String getCdate() {
		return cdate;
	}
	public void setCdate(String cdate) {
		this.cdate = cdate;
	}
	public String getPics() {
		return pics;
	}
	public void setPics(String pics) {
		this.pics = pics;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	@Override
	public String toString() {
		return "CommentPO [cno=" + cno + ", oino=" + oino + ", score=" + score + ", cdate=" + cdate + ", pics=" + pics
				+ ", content=" + content + "]";
	}
	
	
}
