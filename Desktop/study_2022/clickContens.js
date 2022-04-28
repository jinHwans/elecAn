//ddddd

clickContents = function(items, wrap) {
    var self = this;    //this
    this.wrap = wrap;   
    this.itemwrap = '';
    this.clickItems = items;
    this.openItemNum = 0;
    this.items = '';
    this.ansbtn = '';
    // var opa = $(this).css('opacity') == '0';
    this.init = function() {
        this.openItemNum = 0;

        if (this.wrap.find('.clickItem').length > 0) {
            this.wrap.find('.clickContent').remove();
        }

        if (self.clickItems > 0) { //clickItem 이 0보다 클 때
            this.makeWrap();    //clickItem 을 담는 clickContent 생성
            this.makeItem();    //clickItem 생성
            this.makeBtn();     //부수적인 버튼들 생성 (ansbtn)

            this.items.on('click', function() { //item = clickItem 을 클릭 했을 때
                if ($(this).css('opacity') == '0') {    //clickItem 의 opacity(투명도)가 0 일 때 - 까져있을 때
                    $(this).css('opacity', '1');    //clickItem 의 opacity 가 1로됨  - 가려짐
                    self.openItemNum--; //열려있는 clickItem 의 개수 카운트 1개를 뺌
                } else {    //clickItem의 opacity가 1일 때 가려져있을 떄
                    $(this).css('opacity', '0');    //clickItem의 opacity가 0으로 됨 - 까짐
                    self.openItemNum++;             //열려있는 clickItem의 카운트 +1
                }

                effectAdo('click');         //effectAdo() 함수 = 음원실행 함수
                if (self.openItemNum == self.clickItems) {  //열려있는 clickItem 과 생성된 clickItem 의 개수가 같을 때
                    self.ansbtn.addClass('re');     //ansbtn(정답버튼) - makeBtn()함수에서 생성된 버튼 're' 라는 class 더하기
                } else {            //아닐 때
                    self.ansbtn.removeClass('re');  //ansbtn(정답버튼) - makeBtn()함수에서 생성된 버튼 're' 라는 class 빼기
                }
            });

            this.ansbtn.on('click', function() {    //ansbtn(정답버튼) - makeBtn()함수에서 생성된 버튼을 클릭 했을 때
                effectAdo('click');     //effectAdo() 함수 = 음원실행 함수
                if ($(this).hasClass('re')) {   //this = ansbtn 이 're' 라는 class를 갖고 있을 때
                    self.items.css('opacity', '1'); //생성된 clickItem 의 opacity 를 1 (가려짐)
                    self.openItemNum = 0;   //열려있는 clickItem 의 카운트를 0
                    self.ansbtn.removeClass('re');//ansbtn(정답버튼) - makeBtn()함수에서 생성된 버튼 're' 라는 class 빼기
                } else {
                    self.items.css('opacity', '0');//생성된 clickItem 의 opacity 를 0 까짐
                    self.ansbtn.addClass('re');//ansbtn(정답버튼) - makeBtn()함수에서 생성된 버튼 're' 라는 class 더하기
                    self.openItemNum = self.clickItems; //열려있는 clickItem 과 생성된 clickItem 의 개수가 같다.
                }
            });
        }
        /* 확인 결과 필요 없는 내용 */
        //필요없는 이유 clickContent 를 사용할 때 clickContents(1,$('.clickPage1 .page1')) 일 때 앞에 인수가 0일 때는 아래 소스가 있으나 마나다
        // } else {    //clickItem 이 0보다 작을 때
        //     this.makeWrap(); //여기서 this.makebtn() 함수를 불러들이지 않기에 필요가 없다.
        //     this.makeItem();

        //     this.items.on('click', function() {
        //         effectAdo('click');
        //         if ($(this).css('opacity') == '0') {
        //             $(this).css('opacity', '1');
        //         } else {
        //             $(this).css('opacity', '0');
        //         }
        //     });
        // }

    }

    this.makeWrap = function() {    //makeWrap() = clickIitem 을 담을 clickContent 를 만듦
        var html = '<div class="clickContent"></div>';
        this.wrap.append(html);     // 매개변수 ex . clickContent(1,$('.asd')) <- '.asd' 에 변수 html 위에 clickContent 를 append 시킴
        this.itemwrap = this.wrap.find('.clickContent');    //itemwrap 는 매개변수 wrap 안에 '.clickContent
    };

    this.makeItem = function() {
        var html = '';  //변수 html 을 생성 빈 값
        for (var i = 0; i < this.clickItems; i++) { //반복문으로
            html += '<div class="clickItem clickItem' + (i + 1) + '"></div>'
        }
        this.itemwrap.append(html);

        this.items = this.itemwrap.find('.clickItem');

        // if(this.items.length == 1) this.items.addClass('ex');
    };

    this.makeBtn = function() {
        var html = '<div class="ansbtn"></div>'
        this.itemwrap.append(html);

        this.ansbtn = this.itemwrap.find('.ansbtn');
    };
}

clickContents_v = function(items, wrap) {
    var self = this;    //this
    this.wrap = wrap;   
    this.itemwrap = '';
    this.clickItems = items;
    this.openNum = 0;
    this.items = '';
    this.ansbtn = '';
    this.init = function() {
        this.openNum = 0;

        if (this.wrap.find('.clickItem').length > 0) {
            this.wrap.find('.clickContent .clickItem').removeClass('opa');
        }

        if (self.clickItems > 0) {
            this.makeItem();
            this.makeBtn();
            
            this.items.on('click', function() {
                
                effectAdo('click');
                console.log($('.clickItem.opa').length);
                console.log(self.openNum);
                $(this).toggleClass('opa');
                if ($(this).hasClass('opa')) self.openNum++;
                else self.openNum--;

                if(self.clickItems == $('.clickItem.opa').length) self.ansbtn.addClass('re');
                else self.ansbtn.removeClass('re');
            });

            this.ansbtn.on('click', function() {
                effectAdo('click');
                if ($(this).hasClass('re')) {
                    self.wrap.find('.clickItem').removeClass('opa');
                    self.ansbtn.removeClass('re');
                    self.openNum = 0;
                } else {
                    self.wrap.find('.clickItem').addClass('opa');
                    self.ansbtn.addClass('re');
                    self.openNum = self.clickItems;
                }
            });
        }
    }
    this.makeItem = function() {
        var cItem = '';
        for (var i = 0; i < this.clickItems; i++) {
            cItem += '<div class="clickItem clickItem' + (i + 1) + '"></div>'
        }
        this.wrap.find('.clickContent').append(cItem);
        this.items = this.wrap.find('.clickContent').find('.clickItem');
    };
    this.makeBtn = function() {
        var btns = '<div class="ansbtn"></div>'
        this.wrap.find('.clickContent').append(btns);
        this.ansbtn = this.wrap.find('.clickContent').find('.ansbtn');
    };
}
