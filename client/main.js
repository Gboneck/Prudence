Template.body.helpers({
	messages() {
		return Messages.find();
	}
});

Template.registerHelper('fromNow', function (date) {
	return moment(date).fromNow()
});

Template.body.events({
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


