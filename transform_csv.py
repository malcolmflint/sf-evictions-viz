import csv

evictions = list()

with open('Eviction_Notices.csv', newline='') as evictionsFile:
    reader = csv.reader(evictionsFile)
    for row in reader:
        evictions.append(row)

headers = evictions.pop(0)[:-1]
headers += ['longitude', 'latitude']

for eviction in evictions:
    location = eviction.pop(-1)
    if location:
        eviction += location.split('(')[1].split(')')[0].split(' ')
    else:
        eviction += ['', '']

with open('Eviction_Notices_revised.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    for row in evictions:
        writer.writerow(row)
