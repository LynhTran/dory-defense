from bs4 import BeautifulSoup
from utils.mongo import add_blocklist_domain_hash
import requests
import hashlib
import time

domains = []

for x in range(1, 20):
    try:
        index = (20 * (x-1)) + 1
        r = requests.get('https://db.aa419.org/fakebankslist.php?start={}'.format(index))
        if r.status_code == 200:
            soup = BeautifulSoup(r.text, 'html.parser')
            if soup:
                table = soup.find('table', {'class': 'ewTable'})
                if table:
                    for link in table.find_all('a', {'rel': 'nofollow'}):
                        if link:
                            domain = link.get('href')
                            domain = domain.replace('https://', '')
                            domain = domain.replace('http://', '')
                            domain = domain.replace('www.', '')
                            domain = domain.split('/')[0]
                            domains.append(domain)
    except:
        pass

for domain in domains:
    domain_hash = hashlib.md5(domain.encode('utf-8') + 'minnehack2022').hexdigest() #Salted with 'minnehack2022'
    add_blocklist_domain_hash(domain, domain_hash)