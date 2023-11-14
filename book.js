const buyLists = [];

$('.submit').click(function (e) {
    e.preventDefault();
    let firstText = $('#first-text').val();
    let firstTextParts = firstText.split('\n');

    let studentName = firstTextParts[0].split(':')[1].trim();
    let bookName = firstTextParts[1].split(':')[1].trim();
    let origianlPrice = firstTextParts[2].split(':')[1].trim();
    let discountedPrice =
        firstTextParts[3].split(':')[1].trim().split(',')[0] +
        firstTextParts[3].split(':')[1].trim().split(',')[1];

    let obj = {
        학생명: studentName,
        책이름: bookName,
        정가: origianlPrice,
        할인가: discountedPrice,
    };

    buyLists.push(obj);
    console.log(buyLists);

    let hubString = '';

    for (let buyList of buyLists) {
        hubString += `
        학생명: ${buyList.학생명}
        책이름: ${buyList.책이름}
        정가: ${buyList.정가}
        `;
    }

    $('#hub-string').text(hubString);

    // $('#submit').attr(
    //     'onclick',
    //     window.open(`https://search.kyobobook.co.kr/search?keyword=${bookName}`)
    // );

    $('#first-text').val('');

    let totalPrice = 0;
    let talkString = `10만원 이상 교재 구매 건 입금 요청드립니다.
    금액: 
    계좌: 국민 67149011004119
    예금주: (주)교보문고

    중복구매 확인 완료
    입금기한 금일 내
    허브 입력 완료

    `;

    let check = $('#research-check').prop('checked');
    let count = 0;
    if (check == true) {
        count += 1;
        talkString += '연구용 지결서 작성 완료 \n \n';
        $('#research-check').prop('checked', false);
    } else if (check == true && count > 1) {
        $('#research-check').prop('checked', false);
    }

    let under10 = $('#under10-check').prop('checked');
    if (under10 == true) {
        talkString = `교보 캐시로 구매`;
        under10 = $('#under10-check').prop('checked', false);
    }

    for (let buyList of buyLists) {
        totalPrice += parseInt(buyList.할인가);
        talkString += `${buyList.학생명} - ${buyList.책이름}\n`;
    }
    talkString = talkString.replace('금액:', `금액: ${totalPrice}`);
    $('#research-book').html(talkString);
});

$('#copy-btn').click(function (e) {
    e.preventDefault();
    let copyText = $('#research-book');
    content.select();
    document.execCommand('copy');
    alert('복사완료');
});
