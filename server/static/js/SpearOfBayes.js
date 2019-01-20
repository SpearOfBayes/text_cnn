// alert("hello, world");
//jquery

 $(document).ready(function(){
	 //点击左侧导航栏按钮“批量查询”
	 $("#left2").click(function(){
		 $("#left1").attr("class", "module");
		 $(this).attr("class", "active_module");
		 $("#main_window").html(batch_query_module_text_2);
		 //alert('引入jquery成功');
	 })

	 //点击左侧导航栏“单个查询”
	 $("#left1").click(function(){
		 $("#left2").attr("class", "module");
		 $(this).attr("class", "active_module");
		 $("#main_window").html(batch_query_module_text_1);
		 //alert('引入jquery成功');
	 })

	 //在单个搜索中点击“查询按钮”
	 $("#button_1").click(function(){

		var data = {
			'commoditys': $("#text_content")[0].value
		}

		//var test_data = "本地生活--游戏充值--QQ充值";
		//$("#text_content")[0].value = test_data;
		 $.post("/batch_query/",{ //POST请求///////////AJAX////////////////
			data:JSON.stringify(data),
		 },
		 function(response){ //获取数据
			alert(response)
			response_data = JSON.parse(response)
			$("#text_content")[0].value = response_data['ret_class'];
			if(code === 1)
				alert("数据库中没有该商品");
			else if(code === 2)
				alert("输入格式错误");
			else if(code === 3)
				alert("未知错误");
			else if(code === 4)
				alert("输入为空");
			});////////////AJAX////////////////
	})

	//在批量查询中点击“提及”按钮
	$("#button_2").click(function(){
		var commoditys = "";
		for(var i=0; $(".commodity_name")[i].value != ""; i++){
		   //alert($(".commodity_name")[i].value);
		   commoditys += $(".commodity_name")[i].value;
		   commoditys += ",";
		}
		
		var data = {
			"commoditys":commoditys
		}

		//alert(str);
		$.post("/batch_query/",{ ///////////AJAX////////////////
			data: data
		},
		function(re_classes,code){
			var arr = re_classes.split("\\n");
			for(var x=0; x<arr.length; x++)
			{
				//alert(arr[x]);
				$(".class_name")[x].value = arr[x];
			}
			if(code === 1)
				alert("数据库中没有该商品");
			else if(code === 2)
				alert("输入格式错误");
			else if(code === 3)
				alert("未知错误");
			else if(code === 4)
				alert("输入为空");
			});///////////AJAX////////////////
		   
		   //var data_test = '本地生活--游戏充值--QQ充值\\n家用电器--厨房用具--电饭煲';
		   //var arr = data_test.split("\\n");
		   // alert(arr);
		   // for(var x=0; x<arr.length; x++)
		   // {
		   // 	//alert(arr[x]);
		   // 	$(".class_name")[x].value = arr[x];
		   // }
		   // alert($(".commodity_name")[0].value + "," + $(".commodity_name")[1].value);
	})
 });
 

 
var batch_query_module_text_1 = `
<div class="center">
                <!--顶部预留一个筛选栏-->
                <div>

                </div>
                <!---->
                <!--用于放置搜索内容的窗体-->
                <div class="center">
                  <!--应当放在中偏上的位置-->
                  <div class="single_query">
                    <!--可以放一些图片之类的-->
                    <div>
                    </div>
                    <!--单个搜索框和按钮，应当设置为横向排列-->
                    <table>
                      <tr>
                        <th>
                          <div class="search_text">
                            <input id="text_content" type="text" name="commodity" placeholder="输入商品名，如“冬暖夏凉空调被”" style="width:420px;height:100%">
                          </div>
                        </th>
                        <th>
                          <div class="search_button">
                            <button id="button_1" type="button" class="btn btn-info btn-sm" style="height:92%;width:90px;font-size:16px;margin:2px">
                              查  询
                            </button>
							<script>
								 $("#button_1").click(function(){
									//var test_data = "本地生活--游戏充值--QQ充值";
									//$("#text_content")[0].value = test_data;
									 $.post("----URL----",{ //POST请求///////////AJAX////////////////
										commoditys:$("#text_content")[0].value;
										},
										function(re_classes,code){ //获取数据
										$("#text_content")[0].value = re_classes;
										if(code === 1)
											alert("数据库中没有该商品");
										else if(code === 2)
											alert("输入格式错误");
										else if(code === 3)
											alert("未知错误");
										else if(code === 4)
											alert("输入为空");
										});////////////AJAX////////////////
									})
							</script>
                          </div>
                        </th>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
`
	
var batch_query_module_text_2 = `
<!--这⾥⾯的所有内容应当在按键时替换-->
 <!--主窗体-->
 <div>
 <div class="background_container">
 <div class="inner_container">
 <!--这部分⽤于批量查询的输⼊-->
 <div class="batch_query_input">
 <table class="table">
 <thead>
 <tr>
 <th width="70%" style="text-align: center;">商品名</th>
 <th style="text-align: center;">类别</th>
 </tr>
 <tbody>
 <tr>
 <td>
 <input class="commodity_name" type="text"/>
 </td>
 <td>
 <input class="class_name" type="text", readonly="readonly">
 </td>
 </tr>
 <tr>
 <td>
 <input class="commodity_name" type="text"/>
 </td>
 <td>
 <input class="class_name" type="text", readonly="readonly">
 </td>
 </tr>
 <tr>
 <td>
 <input class="commodity_name" type="text"/>
 </td>
 <td>
 <input class="class_name" type="text", readonly="readonly">
 </td>
 </tr>
 <tr>
 <td>
 <input class="commodity_name" type="text"/>
 </td>
 <td>
 <input class="class_name" type="text", readonly="readonly">
 </td>
 </tr>
 <tr>
 <td>
 <input class="commodity_name" type="text"/>
 </td>
 <td>
 <input class="class_name" type="text", readonly="readonly">
 </td>
 </tr>
 <tr>
 <td>
 <input class="commodity_name" type="text"/>
 </td>
 <td>
 <input class="class_name" type="text", readonly="readonly">
 </td>
 </tr>
 <tr>
 <td>
 <input class="commodity_name" type="text"/>
 </td>
 <td>
 <input class="class_name" type="text", readonly="readonly">
 </td>
 </tr>
 <tr>
 <td>
 <input class="commodity_name" type="text"/>
 </td>
 <td>
 <input class="class_name" type="text", readonly="readonly">
 </td>
 </tr>
 <tr>
 <td>
 <input class="commodity_name" type="text"/>
 </td>
 <td>
 <input class="class_name" type="text", readonly="readonly">
 </td>
 </tr>
 <tr>
 <td>
 <input class="commodity_name" type="text"/>
 </td>
 <td>
 <input class="class_name" type="text", readonly="readonly">
 </td>
 </tr>
 <tr>
 <td>
 <input class="commodity_name" type="text"/>
 </td>
 <td>
 <input class="class_name" type="text", readonly="readonly">
 </td>
 </tr>
 </tbody>
 </thead>
 </table>
 </div>
 <!--这部分是底部的各种按钮-->
 <div class="bottom_bar">
 <div class="container-fluid">
 <div class="submit_button">
 <button id="button_2" type="button" class="btn btn-info btn-lg" style="width:100px; margin:10%">提交</button>
 <!--js代码-->
 </div>
 <div class="submit_button">
 <button type="button" class="btn btn-default btn-lg" style="width:100px; margin:10%">导⼊⽂本</button>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 <!--到这为⽌-->`
 