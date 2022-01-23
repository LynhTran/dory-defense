from mongo import get_blocklist_domain_hashes, get_blocklist_domains, add_blocklist_domain_hash
from utils import read_json
import hashlib
import requests
import time
import threading

class Blocklist:
    def __init__(self):
        self.blocklists = read_json('data/blocklists.json')
        self.blocklist_hashed = get_blocklist_domain_hashes()
        threading.Thread(target=self.refresh_blocklists_thread).start()

    def refresh_blocklists_thread(self):
        while True:
            time.sleep(43200)
            self.refresh_blocklists()

    def refresh_blocklists(self):
        print('Refreshing blocklists...')
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
        print('Found {} domains.'.format(len(domains_in_blocklist)))
        blocklist_domains = get_blocklist_domains()
        for domain in domains_in_blocklist:
            #print('Checking {} ({})'.format(domain, domain_hash))
            if domain not in blocklist_domains:
                domain_hash = hashlib.md5(domain.encode('utf-8') + 'minnehack2022').hexdigest() #Salted with 'minnehack2022'
                print('Adding domain to blocklist: ' + domain)
                self.blocklist_hashed.append(domain_hash)
                add_blocklist_domain_hash(domain, domain_hash)
        print('Blocklists updated.')
        
    def check_url_hash(self, url_hash):
        return url_hash in self.blocklist_hashed