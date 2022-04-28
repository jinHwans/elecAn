pageingContents = function(wrap) {  //wrap = 선택자의 위치
    var self = this;
    this.wrap = wrap;
    this.pageNum = wrap.find('.page').length;   //함수 pageingContents 의 매개변수 안에 .page의 개수
    this.currentPage = 0;   //페이지 = 0
    this.next, this.prev, this.navi, this.dot //navigation 의 부수적인 것들

    this.init = function() {    //init() 쉽게 생각해서 초기화라고 생각하면 됨 
        self.wrap.find('.navigation').remove();     //wrap 안에 navigation을 삭제   
        self.currentPage = 0;   //페이지 = 0
        self.wrap.find('.page').hide(); //wrap 안에 페이지 숨기기
        self.wrap.find('.page').eq(0).show();//wrap 안에 페이지의 첫번째 보이기
        self.makeNavi();    //makeNavi() 함수 실행

        self.next.on('click', function() {  //next 클릭했을 때
            self.nextClick($(this));    //nextClick 함수 실행
        });

        self.prev.on('click', function() {//
            self.prevClick($(this));//
        });

        self.dot.each(function() {  //navigation 각 dot 클릭 시 
            $(this).on('click', function() {
                if ($(this).hasClass('on')) return false;   //만약 지금 누른애가  on 을 갖고 있으면 클릭 안됨
                var p = $(this).index();    //변수 p = this 의 인덱스
                self.currentPage = p;   //현재 페이지 = this의 인덱스 ex) this-> 4 = currentPage = 4
                self.pageMove(self.currentPage);
                //pageMove()함수 실행 인수 = currentPage 
            });
        });
    }

    this.makeNavi = function() {    
        var html = '<div class="navigation"></div>';
        self.wrap.append(html);
        self.navi = self.wrap.find('.navigation');
        var prev = '<div class="prev dis"></div>';
        var next = '<div class="next"></div>'
        var pageing = '<div class="pageing"></div>';
        self.navi.append(prev + next + pageing);    //navi안에 prev,next,pageing 삽입
        var dot = '<div class="dot"></div>';
        for (var i = 0; i < self.pageNum; i++) { //페이지 개수 마다 pageing 에 dot 생성
            self.navi.find('.pageing').append(dot);
        }
        self.navi.find('.pageing .dot').eq(0).addClass('on');//첫번 째  dot에 on +
        self.navi.find('.pageing').css('width', (50 * self.pageNum) + 30 + 'px');
        self.navi.find('.pageing').css('left', 960 - (((50 * self.pageNum) + 30) / 2) + 'px');
        self.next = self.navi.find('.next');    //navi('.navigation) 안에 next
        self.prev = self.navi.find('.prev');    //navi('.navigation) 안에 prev
        self.dot = self.navi.find('.pageing .dot'); //navi('.navigation) 안에 pageing 의 dot
    }

    this.nextClick = function(el) {     //el = this
        if (el.hasClass('dis')) return false;
        self.currentPage = self.currentPage + 1;
        self.pageMove(self.currentPage);
    }

    this.prevClick = function(el) {
        if (el.hasClass('dis')) return false;
        self.currentPage = self.currentPage - 1;
        self.pageMove(self.currentPage);
    }

    this.pageMove = function(page) {
        self.currentPage = page;
        self.wrap.find('.page').hide();
        self.wrap.find('.page').eq(self.currentPage).show();
        self.navi.find('.pageing .dot').removeClass('on');
        self.navi.find('.pageing .dot').eq(self.currentPage).addClass('on');

        effectAdo('click');
        /* $('.dis').removeClass('dis'); */ 
        //$('.dis')를 다른 곳에서도 사용하기 때문에 나누기
        $('.navigation .dis').removeClass('dis');
        if (self.currentPage == 0) {
            self.prev.addClass('dis');
        } else if (self.currentPage + 1 == self.pageNum) {
            self.next.addClass('dis');
        }
    };
}

pageingContents_v = function(wrap) {
    var self = this;
    this.wrap = wrap;
    this.pageNum = wrap.find('.page').length;
    this.cP = 0;
    this.next, this.prev, this.navi, this.dot

    this.init = function() {
        self.wrap.find('.navigation').remove();
        self.cP = 0;
        self.wrap.find('.page').hide().eq(0).show();
        self.makeNavi();

        self.next.on('click', function() {
            nextClick()
        });
        self.prev.on('click', function() {
            prevClick();
        });
        self.dot.each(function() {
            $(this).on('click', function() {
                if ($(this).hasClass('on')) return false;
                var p = $(this).index();
                self.cP = p;
                self.pageMove(self.cP);
            });
        });
    }

    this.makeNavi = function() {    
        var html = '<div class="navigation"></div>';
        self.wrap.append(html);
        self.navi = self.wrap.find('.navigation');
        var prev = '<div class="moveP prev dis"></div>';
        var next = '<div class="moveP next"></div>'
        var pageing = '<div class="pageing"></div>';
        self.navi.append(prev + next + pageing);
        var dot = '<div class="dot"></div>';
        for (var i = 0; i < self.pageNum; i++) {
            self.navi.find('.pageing').append(dot);
        }
        self.navi.find('.pageing .dot').eq(0).addClass('on');
        self.navi.find('.pageing').css('width', (50 * self.pageNum) + 30 + 'px');
        self.navi.find('.pageing').css('left', 960 - (((50 * self.pageNum) + 30) / 2) + 'px');
        self.next = $('.next');
        self.prev = $('.prev');
        self.dot = $('.pageing .dot');
    }
    $('.moveP').on('click',function(){
        if($(this).hasClass('prev')) prevClick();
        else nextClick();
    });

    this.pageMove = function(page) {
        self.cP = page;
        self.wrap.find('.page').hide().eq(self.cP).show();
        self.navi.find('.pageing .dot').removeClass('on').eq(self.cP).addClass('on');

        effectAdo('click');
        $('.navigation .dis').removeClass('dis');
        if (self.cP == 0) self.prev.addClass('dis');
        else if (self.cP + 1 == self.pageNum) self.next.addClass('dis');
    };

    function prevClick(){
        if ($('.prev').hasClass('dis')) return false;
        self.cP = self.cP - 1;
        self.pageMove(self.cP);
    }
    function nextClick(){
        if ($('.next').hasClass('dis')) return false;
        self.cP = self.cP + 1;
        self.pageMove(self.cP);
    }
}