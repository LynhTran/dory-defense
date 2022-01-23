from api import API
from utils.blocklist import Blocklist
import threading

blocklist = Blocklist()
api = API(blocklist)

threading.Thread(target=api.run_server).start()