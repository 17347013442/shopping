package shopping;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.util.StringUtils;

import com.yc.biz.IGoodBiz;
import com.yc.biz.impl.GoodBizImpl;
import com.yc.po.GoodPO;
import com.yc.po.TypeItemPO;
import com.yc.po.TypePO;
import com.yc.util.StringUtil;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class GoodImplTest {
	@Autowired
private IGoodBiz goodBizImpl;


@Test
public void TestFindByItem() {
	GoodPO po=new GoodPO();
	po.setTino(1);
	List<GoodPO>list =new ArrayList<GoodPO>();
	list=goodBizImpl.findByItem(po);
	//System.out.println(list);
	for(GoodPO p:list) {
		System.out.println(p);
	}
}


@Test
public void TestFindByTno() {
	
	TypeItemPO po=new TypeItemPO();
	
	List<TypePO>list =new ArrayList<TypePO>();
	list=goodBizImpl.findByTno(po);
	//System.out.println(list);
	for(TypePO p:list) {
		System.out.println(p);
	}
}

@Test
public void TestAddGood() {
	GoodPO po=new GoodPO();
	po.setTino(1);
	po.setPics("aaa");
	po.setBalance(1000);
	po.setPrice(100.0);
	po.setGname("娃哈哈");
	
	System.out.println(goodBizImpl.add(po));
}


@Test
public void TestFindByPage() {
	GoodPO po=new GoodPO();
	po.setTino(1);
	
	System.out.println(goodBizImpl.findByPage(1, 5, po));
}
}

