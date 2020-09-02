const Parse = require('parse/node');

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

// const createSentryIssue = async (user, params={}) => {
//   const sentryIssue = new Parse.Object('SentryIssue');
//   const acl = new Parse.ACL(user);
//   acl.setPublicReadAccess(false);
//   acl.setPublicWriteAccess(false);
//   acl.setReadAccess(user, true);
//   acl.setWriteAccess(user, false)
//   sentryIssue.setACL(acl);
//   return sentryIssue.save({ userPtr: user, ...params }, { useMasterKey: true });
// };

const createSentryIssue = async (params = {}) => {
  const sentryIssue = new Parse.Object('SentryIssue');
  const acl = new Parse.ACL();
  sentryIssue.setACL(acl);
  acl.setPublicReadAccess(true);
  acl.setPublicWriteAccess(false);
  return sentryIssue.save(params, { useMasterKey: true });
};

const findSentryIssue = (sentryId) => {
  return new Parse.Query('SentryIssue')
    .equalTo('sentryId', sentryId)
    .first({ useMasterKey: true });
};

const handleProjects = async (req, res) => {
  const { query } = req;
  console.log('handleProjects', query);
  const projects = [
    { label: 'project 0', value: 0 },
    { label: 'project 1', value: 1 },
    { label: 'another 3', value: 3 },
    { label: 'hello 4', value: 4 },
  ];
  // if (!query || !query.query) {
  //   return res.send([]);
  // }
  if (query && query.query && query.query.length < 3) {
    projects.push({ label: 'project 2', value: 2 });
  }
  return res.send(projects);
};

const handleBoards = async (req, res) => {
  const { query } = req;
  console.log('handleBoards', query);
  // await sleep(500);

  if (query.dependentData) {
    const { project_id } = JSON.parse(query.dependentData);
    if (project_id === undefined) {
      return res.send([]);
    }
    if (project_id > 1) {
      return res.send([
        { label: 'board x', value: 'x' },
        { label: 'board y', value: 'y' },
      ]);
    }
    return res.send([
      { label: 'board r', value: 'r' },
      { label: 'board s', value: 's' },
    ]);
  }
  return res.send([
    { label: 'board missing', value: 'kk' },
    { label: 'board lol', value: 'j' },
  ]);
};

const handleLists = async (req, res) => {
  const { query } = req;
  console.log('handleLists', query);
  // await sleep(1000);
  if (query.dependentData) {
    const { project_id } = JSON.parse(query.dependentData);
    if (project_id > 1) {
      return res.send([
        { label: 'list c', value: 'c' },
        { label: 'list d', value: 'd' },
      ]);
    }
    return res.send([
      { label: 'list a', value: 'a' },
      { label: 'list b', value: 'b' },
    ]);
  }
  return res.send([]);
};

const handleCards = (req, res) => {
  const { query } = req;
  console.log('handleCards', query);
  if (query.dependentData) {
    const { list_id } = JSON.parse(query.dependentData);
    if (list_id > 1) {
      return res.send([
        { label: 'card c', value: 'c' },
        { label: 'card d', value: 'd' },
      ]);
    }
    return res.send([
      { label: 'card a', value: 'a' },
      { label: 'card b', value: 'b' },
    ]);
  }
  return res.send([]);
};

const handleStories = (req, res) => {
  const { query } = req;
  console.log('handleStories', query);
  return res.send([
    { label: 'story 1', value: 1 },
    { label: 'story 2', value: 2 },
  ]);
};

const createExternalIssue = (req, res) => {
  return res.send({
    project: 'hi',
    webUrl: 'https://www.google.com',
    identifier: 'lol',
  });
};

const empty = (req, res) => {
  return res.send([]);
};

module.exports = {
  createExternalIssue,
  createSentryIssue,
  findSentryIssue,
  handleProjects,
  handleBoards,
  handleLists,
  handleCards,
  handleStories,
  empty,
};
