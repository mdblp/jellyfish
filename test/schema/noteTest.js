/*
 * == BSD2 LICENSE ==
 * Copyright (c) 2014, Tidepool Project
 * 
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the associated License, which is identical to the BSD 2-Clause
 * License as published by the Open Source Initiative at opensource.org.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the License for more details.
 * 
 * You should have received a copy of the License along with this program; if
 * not, you can obtain one from Tidepool Project at tidepool.org.
 * == BSD2 LICENSE ==
 */

 /* global describe, before, beforeEach, it, after */

'use strict';

var util = require('util');

var _ = require('lodash');
var salinity = require('salinity');

var expect = salinity.expect;
var sinon = salinity.sinon;

var helper = require('./schemaTestHelper.js');
var schema = require('../../lib/schema/schema.js');

var goodObject = {
  type: 'note',
  time: '2014-01-01T01:00:00.000Z',
  timezoneOffset: 120,
  conversionOffset: 0,
  displayTime: '2014-01-01T07:00:00.000Z',
  deviceId: 'test',
  uploadId: 'test',
  _groupId: 'g',
  shortText: '1234',
  text: 'Howdy ho, this is a note',
  creatorId: 'abcd'
};

var reference = {
  type: 'smbg',
  time: '2013-11-27T17:00:00.000Z',
  timezoneOffset: 120,
  deviceId: 'test',
  uploadId: 'test',
  value: 1.12,
  _groupId: 'g'
};

beforeEach(function(){
  helper.resetMocks();
  sinon.stub(helper.streamDAO, 'getDatum');
  helper.streamDAO.getDatum
    .withArgs(schema.makeId(reference), goodObject._groupId, sinon.match.func)
    .callsArgWith(2, null, reference);
});

describe('schema/note.js', function(){

  describe('shortText', function(){
    helper.okIfAbsent(goodObject, 'shortText');
    helper.expectStringField(goodObject, 'shortText');
  });

  describe('text', function(){
    helper.rejectIfAbsent(goodObject, 'text');
    helper.expectStringField(goodObject, 'text');
  });

  describe('creatorId', function(){
    helper.rejectIfAbsent(goodObject, 'creatorId');
    helper.expectStringField(goodObject, 'creatorId');
  });

  describe('displayTime', function(){
    helper.okIfAbsent(goodObject, 'displayTime');
    helper.expectStringField(goodObject, 'displayTime');
  });

  describe('reference', function(){
    helper.expectNotNumberField(goodObject, 'reference');

    it('Updates the time based on the reference', function(done){
      var localGood = _.assign({}, goodObject, {reference: reference});

      helper.run(localGood, function(err, datum) {
        if (err != null) {
          return done(err);
        }

        expect(datum.reference).equals(schema.makeId(reference));
        expect(datum.time).equals(reference.time);
        expect(datum.displayTime).equals(goodObject.displayTime);
        done();
      });
    });

    it('Also updates the displayTime, if not defined', function(done){
      var localGood = _.assign(_.omit(goodObject, 'displayTime'), {reference: reference});

      helper.run(localGood, function(err, datum) {
        if (err != null) {
          return done(err);
        }

        expect(datum.reference).equals(schema.makeId(reference));
        expect(datum.time).equals(reference.time);
        expect(datum.displayTime).equals(goodObject.time);
        done();
      });
    });
  });

  helper.testCommonFields(goodObject);
});