import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'
import { Status } from '../status.js';

Meteor.publish ('status.status', function () {
    return Status.find ({ chainId : Meteor.settings.public.chainId });
});

