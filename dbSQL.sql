create database MyLibrary character set utf8 collate utf8_general_ci;
alter user 'root'@'localhost' identified with mysql_native_password by 'root';

use MyLibrary;

create table user(
	userNo int not null auto_increment,
    userID varchar(50) not null,
    userPassword varchar(50) not null,
    userName varchar(20) not null,
    unlockType int not null,
    unlockPassword varchar(255) default null,
    primary key(userNo),
    unique key(userID)
);

create table book(
	bookNo int not null auto_increment,
    refUserNo int not null,
    isbn varchar(15) not null,
    imgPath text not null,
    title varchar(255) not null,
    author varchar(50) not null,
    page int not null,
    readPage int default 0,
    begDate date default (current_date),
    endDate date default null,
    primary key(bookNo),
    foreign key(refUserNo) references user(userNo)
		on delete cascade
);

create table tag(
	tagNo int not null,
    tagName varchar(255) not null,
    primary key(tagNo)
);

create table usedTag(
	usedTagNo int not null auto_increment,
    refBookNo int not null,
    refTagNo int not null,
    refUserNo int not null,
    primary key(usedTagNo),
    foreign key(refBookNo) references book(bookNo)
		on delete cascade,
	foreign key(refTagNo) references tag(tagNo)
		on delete cascade,
	foreign key(refUserNo) references user(userNo)
		on delete cascade
);

create table memo(
	memoNo int not null auto_increment,
    refBookNo int not null,
    refUserNo int not null,
    type int not null,
    content text not null,
    addDate datetime not null,
    primary key(memoNo),
    foreign key(refBookNo) references book(bookNo)
		on delete cascade,
	foreign key(refUserNo) references user(userNo)
		on delete cascade
);

create table favMemo(
	favMemoNo int not null auto_increment,
    refMemoNo int not null,
    refUserNo int not null,
    primary key(favMemoNo),
    foreign key(refMemoNo) references memo(memoNo)
		on delete cascade,
	foreign key(refUserNo) references user(userNo)
		on delete cascade
);

desc user;
desc book;
desc tag;
desc usedTag;
desc memo;
desc favMemo;

select * from user;
select * from book;
select * from tag;
select * from usedTag;
select * from memo;
select * from favMemo;

select count(*) from tag;

insert into user(userID, userPassword, userName, unlockType) values("asd", "1234", "홍길서", 0);
-- insert into book(refUserNo, isbn, imgPath, title, author, page) values(1, text.isbn, "imgPath", text.title, text.author, text.itemPage);
-- insert into usedTag(refBookNo, refTagNo, refUserNo)
-- 	select bookNo, text.categoryId, refUserNo from book order by userNo desc;

delete from book where bookNo <> 1;
-- select * from book where refUserNo = 1 and page <> readPage order by bookNo desc;
-- select * from book where refUserNo = 1 and page = readPage;
select * from book where refUserNo = 1 and endDate is not null;
select * from book where refUserNo = 1 and endDate is null;

update book set readPage = 5 where bookNO = 70;
update book set endDate = (current_date) where bookNO = 70;


select floor(RAND() * 1000);
alter table book modify column endDate date default null;
alter table book modify column begDate date default (current_date);

select title, begDate, endDate from book where bookNo = 66;