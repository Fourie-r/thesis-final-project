import { InMemoryDbService } from 'angular-in-memory-web-api';
export class MockData implements InMemoryDbService {
  createDb() {
    const getPeoples = [{ id: 1, name: 'Ivan Mihaylov', photo: 'https://avatars2.githubusercontent.com/u/22446301?s=400&u=44830387726809ee99c92964c4b3002a6f40a951&v=4',
        designation: 'Software Developer' },
        { id: 2, name: 'Ivan Mihaylov Mihaylov', photo: 'https://avatars2.githubusercontent.com/u/216296?v=3&s=400', designation: 'Software Engineer' }];

    const getSkills = [
      {
        id: 1,
        name: 'Angular 6'
      },
      {
        id: 2,
        name: 'Angular 4'
      },
      {
        id: 3,
        name: 'TypeScript'
      },
      {
        id: 4,
        name: 'NodeJs'
      },
      {
        id: 5,
        name: 'Firebase'
      },
      {
        id: 6,
        name: 'HTML5'
      },
      {
        id: 7,
        name: 'CSS3'
      },
      {
        id: 8,
        name: 'SASS'
      }
    ];
    const getTasks = [
      {
        id: 1,
        title: 'Create peoples module',
        people: 1,
        skills: [1, 2, 3],
        startDate: '2017-04-01T22:15:01+02:00',
        endDate: '2017-04-07T22:15:01+02:00',
        start: '2017-04-01T22:15:01+02:00',
        end: '2017-04-07T22:15:01+02:00',
        backgroundColor: '#fcf8e3'
      },
      {
        id: 2,
        title: 'Create add new task module',
        people: 1,
        skills: [1, 2, 3],
        startDate: '2017-04-06T22:15:01+02:00',
        endDate: '2017-04-13T22:15:01+02:00',
        start: '2017-04-06T22:15:01+02:00',
        end: '2017-04-13T22:15:01+02:00',
        backgroundColor: '#fcf8e3'
      },
      {
        id: 3,
        title: 'Create Task list',
        people: 2,
        skills: [1, 2, 3],
        startDate: '2017-04-03T22:15:01+02:00',
        endDate: '2017-04-10T22:15:01+02:00',
        start: '2017-04-03T22:15:01+02:00',
        end: '2017-04-10T22:15:01+02:00',
        backgroundColor: '#fcf8e3'
      },
      {
        id: 4,
        title: 'Create task inprogress board',
        people: 1,
        skills: [2, 5, 6],
        startDate: '2017-04-10T22:15:01+02:00',
        endDate: '2017-04-18T22:15:01+02:00',
        start: '2017-04-10T22:15:01+02:00',
        end: '2017-04-18T22:15:01+02:00',
        backgroundColor: '#fcf8e3'
      },
      {
        id: 5,
        title: 'Create task complete board',
        people: 2,
        skills: [3, 4, 7],
        startDate: '2017-04-18T22:15:01+02:00',
        endDate: '2017-04-25T22:15:01+02:00',
        start: '2017-04-18T22:15:01+02:00',
        end: '2017-04-25T22:15:01+02:00',
        backgroundColor: '#fcf8e3'
      },
      {
        id: 6,
        title: 'Create task chart overview on board',
        people: 1,
        skills: [1, 2, 3, 6],
        startDate: '2017-04-22T22:15:01+02:00',
        endDate: '2017-04-30T22:15:01+02:00',
        start: '2017-04-22T22:15:01+02:00',
        end: '2017-04-30T22:15:01+02:00',
        backgroundColor: '#fcf8e3'
      },
      {
        id: 7,
        title: 'Create service for task',
        people: 2,
        skills: [1, 2, 3, 7, 8],
        startDate: '2017-04-25T22:15:01+02:00',
        endDate: '2017-04-30T22:15:01+02:00',
        start: '2017-04-25T22:15:01+02:00',
        end: '2017-04-30T22:15:01+02:00',
        backgroundColor: '#fcf8e3'
      },
      {
        id: 8,
        title: 'Testing software',
        people: 2,
        skills: [8, 9, 10],
        startDate: '2017-04-09T22:15:01+02:00',
        endDate: '2017-05-20T22:15:01+02:00',
        start: '2017-04-09T22:15:01+02:00',
        end: '2017-05-01T20:15:01+02:00',
        backgroundColor: '#fcf8e3'
      }
    ];
    const inProgressTask = [
      {
        id: 1,
        title: 'Server Deploy',
        people: 1,
        skills: [6, 7, 12],
        startDate: '2017-04-17T22:15:01+02:00',
        endDate: '2017-04-28T22:15:01+02:00',
        start: '2017-04-17T22:15:01+02:00',
        end: '2017-04-28T22:15:01+02:00',
        backgroundColor: '#dff0d8'
      },
      {
        id: 2,
        title: 'Data Model Creation',
        people: 1,
        skills: [4, 8, 9],
        startDate: '2017-04-20T22:15:01+02:00',
        endDate: '2017-04-27T22:15:01+02:00',
        start: '2017-04-20T22:15:01+02:00',
        end: '2017-04-27T22:15:01+02:00',
        backgroundColor: '#dff0d8'
      }
    ];
    const completedTask = [
      {
        id: 1,
        title: 'Chart create for skill compare',
        people: 2,
        skills: [1, 3, 6],
        startDate: '2017-04-01T22:15:01+02:00',
        endDate: '2017-04-10T22:15:01+02:00',
        start: '2017-04-01T22:15:01+02:00',
        end: '2017-04-10T22:15:01+02:00',
        backgroundColor: '#d9edf7'
      },
      {
        id: 2,
        title: 'Top contribution report',
        people: 1,
        skills: [1, 2, 4, 7],
        startDate: '2017-04-12T22:15:01+02:00',
        endDate: '2017-04-20T22:15:01+02:00',
        start: '2017-04-12T22:15:01+02:00',
        end: '2017-04-20T22:15:01+02:00',
        backgroundColor: '#d9edf7'
      }
    ];
    const taskContribution = [
      {
        id: 1,
        people: 1,
        data: [
          3.907,
          7.943,
          7.848,
          9.284,
          9.263,
          9.801,
          3.89,
          8.238,
          9.552,
          6.855
        ]
      },
      {
        id: 2,
        people: 2,
        data: [
          4.743,
          7.295,
          7.175,
          6.376,
          8.153,
          8.535,
          5.247,
          -7.832,
          4.3,
          4.3
        ]
      },
      {
        id: 3,
        people: 2,
        data: [
          0.01,
          -0.375,
          1.161,
          0.684,
          3.7,
          3.269,
          1.083,
          -5.127,
          3.69,
          2.995
        ]
      },
      {
        id: 4,
        people: 2,
        data: [
          1.988,
          2.733,
          3.994,
          3.464,
          4.001,
          3.939,
          1.333,
          -2.245,
          4.339,
          2.727
        ]
      },
      {
        id: 5,
        people: 1,
        data: [
          2.345,
          4.733,
          1.994,
          2.464,
          5.001,
          2.939,
          3.333,
          -1.245,
          2.339,
          4.727
        ]
      },
      {
        id: 6,
        people: 1,
        data: [
          0.397,
          2.733,
          6.994,
          3.464,
          6.001,
          1.939,
          4.333,
          3.245,
          5.339,
          1.727
        ]
      },
      {
        id: 7,
        people: 2,
        data: [
          3.397,
          5.733,
          1.994,
          2.464,
          6.001,
          3.939,
          7.333,
          2.245,
          1.339,
          3.727
        ]
      }
    ];
    return {
      getPeoples,
      getSkills,
      getTasks,
      inProgressTask,
      completedTask,
      taskContribution
    };
  }
}
