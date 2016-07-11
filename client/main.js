Template.operator.helpers({
	messages() {
		return Messages.find();
	}
});

Template.registerHelper('fromNow', function (date) {
	return moment(date).fromNow()
});

Template.operator.events({
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

Template.operator.onRendered(function () {
$('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})
})

Router.configure({layoutTemplate: 'layout'});
Router.route('/', { name: 'operator'})
Router.route('/user', { name: 'user'})
