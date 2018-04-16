/* global $ */
'use strict';

const api = {

  search: function (query, callback) {
    $.ajax({
      type: 'GET',
      url: '/api/notes/',
      dataType: 'json',
      data: query,
      success: callback
    });
  },

  details: function (id, callback) {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: `/api/notes/${id}`,
      success: callback
    });
  }
};
