Template.body.helpers({
	messages() {
		return Messages.find();
	}
});

Template.registerHelper('fromNow', function (date) {
	return moment(date).fromNow()
});

Template.body.events({
	'keypress textarea'(e, i) {
		if (e.keyCode == 13)
			$('#messageForm').submit();
	},
	'submit form'(e, i) {
		e.preventDefault();
		Messages.insert({
			text: e.target.message.value,
			created: new Date(),
			user: null,
			prudence: true,
		});
		e.target.message.value = null;
	}
});


