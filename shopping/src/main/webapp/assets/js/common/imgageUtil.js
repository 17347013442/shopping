
function drawImage(showImage){
	var showWidth = showImage.width;//得到要展示图片的宽
	var showHeight = showImage.height;//得到要展示图片的高
	var isCompression = false;
	var sourceImage = new Image();
	sourceImage.src = showImage.src;
	if(sourceImage.width > 0 && sourceImage.height > 0){
		isCompression = true;
		if(sourceImage.width / sourceImage.height >= showWidth / showHeight){
			if(sourceImage.width > showWidth){
				showImage.width = showWidth;
				showImage.height = (sourceImage.height * showWidth) / sourceImage.width;
			}else{
				showImage.width = sourceImage.width;
				showImage.height = sourceImage.height;
			}
		}else{
			if(sourceImage.height > showHeight){
				showImage.height = showHeight;
				showImage.width = (sourceImage.width * showHeight) / sourceImage.height;
			}else{
				showImage.width = sourceImage.width;
				showImage.height = sourceImage.height;
			}
		}
		//showImage.alt = showImage.width + "×" + showImage.height;
		//sourceImage.alt = sourceImage.width + "×" + sourceImage.height;
	}
	return isCompression;
}