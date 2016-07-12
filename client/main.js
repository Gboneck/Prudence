Template.operator.helpers({
	messages() {
		if (Router.current().params.id)
			return Messages.find({user: Router.current().params.id});
	},
	users() {
		return Meteor.users.find().map(function (doc) {
			return { email: doc.emails[0].address, id: doc._id, active: doc._id == Router.current().params.id};
		})
	}
});

Template.registerHelper('fromNow', function (date) {
	return moment(date).fromNow()
});

Template.registerHelper('name', function () {
	if (Meteor.user())
		return Meteor.user().emails[0].address;
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
			user: Router.current().params.id,
			prudence: true,
		});
		e.target.message.value = null;
		setTimeout(function () {
			$('.chat-history').scrollTop($('.chat-history').height());
		}, 100);
	}
});

Template.operator.onRendered(function () {
$('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})
	setTimeout(function () {
		$('.chat-history').scrollTop($('.chat-history').height());
	}, 100);
});

Router.configure({layoutTemplate: 'layout'});
Router.route('/', { name: 'user'})
Router.route('/prudence', { template: 'operator'})
Router.route('/prudence/:id', { template: 'operator'})

Template.user.helpers({
	messages() {
		return Messages.find({user: Meteor.userId()});
	},
	name() {
		return Meteor.user().email;
	}
});

Template.user.onRendered(function () {
	setTimeout(function () {
		$('.chat-history').scrollTop($('.chat-history').height());
	}, 100);
});

Template.user.events({
	'keypress textarea'(e, i) {
		if (e.keyCode == 13)
			$('#messageForm').submit();
	},
	'submit form'(e, i) {
		e.preventDefault();
		Messages.insert({
			text: e.target.message.value,
			created: new Date(),
			user: Meteor.userId()
		});
		e.target.message.value = null;
		setTimeout(function () {
			$('.chat-history').scrollTop($('.chat-history').height());
		}, 100);
	}

});
