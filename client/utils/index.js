export function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  const difference = to - element.scrollTop;
  const perTick = (difference / duration) * 10;
  setTimeout(() => {
    console.log(new Date());
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90;
  } else {
    return new Date(new Date().toDateString());
  }
}

/**
 * Format a date like YYYY-MM-DD.
 *
 * @param {string} template
 * @param {Date=} [date]
 * @return {string}
 */
export function formatDate(template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':');
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4);
  return date
    .toISOString()
    .split(/[-:.TZ]/)
    .reduce(function(template, item, i) {
      return template.split(specs[i]).join(item);
    }, template);
}

// tiny version of lodash get
export function get(obj = {}, path = '') {
  return path
    .replace(/\[(.+?)\]/g, '.$1')
    .split('.')
    .reduce((o, key) => o && o[key], obj);
}

export function getSummary(data = []) {
  const sumMethod = {
    serious: 'average',
    san: 'average',
    hunger: 'average',
    hp: 'average',
    freeTime: 'average',
    sleepTime: 'timeCount',
    hasImportantThing: 'count',
    hasSport: 'count',
    hasRead: 'count',
    hasKindle: 'count',
    fallAsleep: 'percent'
  };

  const getSumResult = (sum, value, method) => {
    switch (method) {
      case 'average': // 内部只做加法
      case 'count':
        sum += ~~value;
        return sum;
      case 'percent':
        sum += /容易/.test(value.slice(0, 2)) ? 1 : 0;
        return sum;
      default:
        sum += /^2[0-3]$/.test(value.slice(0, 2)) ? 1 : 0;
        return sum;
    }
  };

  const summary = data.reduce((smry, item) => {
    for (let key in item) {
      if (sumMethod[key]) {
        smry[key] = getSumResult(smry[key] || 0, item[key], sumMethod[key]);
      }
    }
    return smry;
  }, {});

  for (let key in sumMethod) {
    if (/(average|percent)/.test(sumMethod[key])) {
      summary[key] = (summary[key] / data.length).toFixed(1);
    }
  }
  return summary;
}
