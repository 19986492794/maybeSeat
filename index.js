
var valselectedSeat = [];
torenderResult = (data)=>{
  let resultHtml = ''
  const seatNum = $('#nvalue').val();
  for(let i=0;i<seatNum;i++) {
    resultHtml += "<ul>"
    for(let j=0;j<10;j++) {
    resultHtml += "<li>"+(i+1)+'排'+(j+1)+'座'+"</li>"
    }
    resultHtml += "</ul>";
  }
  $('#result-content').html(resultHtml);
  computed(data);
}

function computed(data) {
  valselectedSeat.forEach((item,idx)=>{
    $("#result-content ul").eq(item[0]).find("li").eq(item[1]).css("background-color","red");
  })
  data.forEach((item,idx)=>{
    item.split('-').forEach(eitem=>{
      let set = parseInt(eitem.split(',')[1])+1
      console.log(set)
      $("#result-content ul").eq(eitem.split(',')[0]).find("li").eq(set).css("background-color","green");
    })
  })
}

$('#nbutton').click(function(){
  const seatNum = $('#nvalue').val();
  console.log(seatNum);
  let selectHtml = '';
  for(let i=0;i<seatNum;i++) {
    selectHtml += "<ul>"
    for(let j=0;j<10;j++) {
    selectHtml += "<li><input type='checkbox' id='idx-"+i+'-'+j+"'></li>"
    }
    selectHtml += "</ul>";
  }
  $('#select-content').html(selectHtml);
  $("#sbutton").addClass("show");
})

$('#sbutton').click(function(){
  const selectedSeat = [];
  const seatNum = $('#nvalue').val();
  for(let i=0;i<seatNum;i++) {
    const seat = $('#select-content').find('ul').eq(i).find('input:checked');
    seat.each((idx,item)=>{
      selectedSeat.push([i,parseInt(item.id.split('-')[2])]);
    })
  }
  // console.log(selectedSeat);
  // console.log('可选位置：\n',getSeat(3,[[0,1],[0,2],[0,7],[1,5],[2,0],[2,9]]));
  valselectedSeat = selectedSeat
  getSeat(seatNum,selectedSeat);
}).click();

function getSeat(seatNum,selectedSeat) {
  const peoplenum = 4;
  const onecount = 10;
  const maybeSeat = [];
  for(let i=0;i<seatNum;i++) {
    // 初始化单排座位
    let oneinitseat = [0,0,0,0,0,0,0,0]  // 0代表空位，1代表已选，2代表可选  
    // 3 4 3 中间两过道型影院，单排座位第一个和最后一个对运算结果不受影响
    selectedSeat.forEach(item=>{
      if(item[0] === i) {
        if(item[1] !== 0 && item[1] !== (onecount-1)) {
          oneinitseat[item[1]-1] = 1;
        }
      }
    })
    let onemaybe = [];
    oneinitseat.forEach((item,idx)=>{
      if(item === 0) {
        onemaybe.push(idx);
      } else{
        onemaybe = []
      }
      if (onemaybe.length === peoplenum) {
        // const fommitdata = onemaybe.map(item=>{
        //   return `${i+1}排${item+2}号`;
        // }).join(",");
        // maybeSeat.push(fommitdata);
        const fommitdata = onemaybe.map(item=>{
          return `${i},${item}`;
        }).join("-");
        maybeSeat.push(fommitdata);
        onemaybe = []
      }
    })
  }
  stringSeat = maybeSeat.join("\n");
  torenderResult(maybeSeat);
  // return stringSeat +'\n'+ maybeSeat.length+"种情况可选择";
}