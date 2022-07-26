import requests
import json

url = 'https://movie.naver.com/movie/bi/mi/runningJson.naver'
param = {'code':81888,
    'regionRootCode' : 10,
    'reserveDate' : '2022-07-26'}
response = requests.post(url, params=param)
html = response.json()

f = open('./movie.txt', 'w', encoding='utf-8')
for items in html['groupScheduleList']:
    for item in items['theaterScheduleList']:
        for this in item['timetableList']:
            f.write(this['image'])
            f.write('\t')
            f.write(this['gname'].replace(' ', ''))
            f.write('\t')
            f.write(this['untilDatetime'])
            f.write('\t')
            f.write(this['rtime'])
            f.write('\t')
            f.write(this['endTime'])
            f.write('\t')
            f.write(this['tname'])
            f.write('\t')
            f.write(this['ticketPcUrl'])
            f.write('\n')
f.close()