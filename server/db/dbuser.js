exports.users=[
	{
		user_id:1,
		firstname:"John",
		lastname:"Doe",
		othername:"Simon",
		email:"johndoe@gmail.com",
		password:"pass123",
		phoneNumber:"07053306508",
		surname:"johndoe1",
		registered:"Tue 25 2018",
		isAdmin:false
	},
	{
		user_id:2,
		firstname:"Adam",
		lastname:"Brain",
		othername:"Johnson",
		email:"adamjohnson@gmail.com",
		password:"p30adam1",
		phoneNumber:"333-321-3123",
		surname:"adamadam",
		registered:"Wed 26 2018",
		isAdmin:false
	}
];
exports.meetup=[
	{
		meetup_id:1,
		createdOn:"Tue 25 2018",
		location:"abuja",
		imagePath:"./images/firstimage.jpg",
		topic:"Ebola sanitization conference",
		happeningOn:"01/20/2018",
		Tag:"Health"
	},
	{
		meetup_id:2,
		createdOn:"Thurs 28 2018",
		location:"abuja",
		imagePath:"./images/secondimage.jpg",
		topic:"Ebola sanitization conference",
		happeningOn:"12/12/2018",
		Tag:"Health"
	},
	{
		meetup_id:3,
		createdOn:"Thurs 29 2018",
		location:"abuja",
		imagePath:"./images/secondimage.jpg",
		topic:"Ebola sanitization conference",
		happeningOn:"12/29/2018",
		Tag:"Health"
	}
];
exports.question=[
	{
		question_id:1,
		createdOn:"Sat 31 2018",
		createdBy:2,
		meetup_id:3,
		title:"Has the venue been prospond?",
		body:"I was told by a friend that the venue has been prospond",
		vote:3
	},
	{
		question_id:2,
		createdOn:"Sat 31 2018",
		createdBy:1,
		meetup_id:2,
		title:"How Much is the fees?",
		body:"Please i want to know the amount we are paying this time",
		vote:5
	}
    
];
exports.rsvp=[
	{
		rsvp_id:1,
		meetup:2,
		user:1,
		response:"yes"
	}
];