from mongo import get_blocklist_domain_hashes, add_blocklist_domain_hash
from utils import read_json
import hashlib
import requests
import time

class Blocklist:
    def __init__(self):
        self.blocklists = read_json('data/blocklists.json')
        self.blocklist_hashed = get_blocklist_domain_hashes()

    def refresh_blocklists_thread(self):
        while True:
            self.refresh_blocklists()
            time.sleep(43200)

    def refresh_blocklists(self):
        domains_in_blocklist = []
        for url in self.blocklists:
            print('Updating blocklist: ' + url)
            try:
                r = requests.get(url, timeout=10)
                if r.status_code == 200:
                    data = []
                    if '.json' in url:
                        data = r.json()['domains']
                    else:
                        data = r.text.split('\n')
                    for domain in data:
                        if len(domain) > 0:
                            domains_in_blocklist.append(domain)
            except:
                pass
            time.sleep(0.5)
        for domain in domains_in_blocklist:
            domain_hash = hashlib.md5(domain.encode('utf-8') + 'minnehack2022').hexdigest() #Salted with 'minnehack2022'
            if domain_hash not in self.blocklist_hashed:
                print('Adding domain to blocklist: ' + domain)
                self.blocklist_hashed.append(domain_hash)
                add_blocklist_domain_hash(domain, domain_hash)
        
    def check_url_hash(self, url_hash):
        return url_hash in self.blocklist_hashed