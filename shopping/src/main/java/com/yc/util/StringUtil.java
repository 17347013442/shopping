package com.yc.util;

public class StringUtil {
public static boolean isNull(String...strs) {
	if(null==strs || strs.length<=0) {
		return true;
	}
	for(String s:strs) {
		if(null==s || "".equals(s)) {
			return true;
		}
	}
	return false;
}
}
