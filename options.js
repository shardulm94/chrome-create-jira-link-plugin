'use strict';

// Saves options to chrome.storage
function save_options() {
  var server = document.getElementById('jira-server').value;
  if (server.endsWith('/')) {
    server = server.slice(0, -1);
  }

  var additionalServer = document.getElementById('additional-jira-server').value;
  if (additionalServer.endsWith('/')) {
    additionalServer = additionalServer.slice(0, -1);
  }

  var additionalServerProjects = document.getElementById('additional-jira-server-projects').value;

  chrome.storage.sync.set({
    jira_server: server,
    additional_jira_server: additionalServer,
    additional_jira_server_projects: additionalServerProjects
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Settings saved';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    jira_server: 'https://issues.apache.org/jira',
    additional_jira_server: '',
    additional_jira_server_projects: ''
  }, function(data) {
    document.getElementById('jira-server').value = data.jira_server
    document.getElementById('additional-jira-server').value = data.additional_jira_server
    document.getElementById('additional-jira-server-projects').value = data.additional_jira_server_projects
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);