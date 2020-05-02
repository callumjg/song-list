const yup = require('yup');

const test = yup.object().shape({
  songs: yup.array().of(yup.string()),
});

const sample = { songs: ['one', 'two', 1, 3], not: 'asdf' };

test
  .validate(sample, { stripUnknown: true, strict: true, abortEarly: false })
  .then((res) => console.log(res))
  .catch((e) => {
    console.log(e.name);
    const map = e.inner.reduce((map, item) => {
      map[item.path] = item.errors;
      return map;
    }, {});
    console.log(map);
  });
