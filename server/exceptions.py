import json

'''
定义了一个_Exception类，用于封装异常（或者无异常）的返回值
'''
class _Exception:

    # 构造函数，code是代码，msg是返回的文本消息
    def __init__(self, code, msg):
        self.code = code
        self.msg = msg

    def package(self, code, ret_class):
        re_json = {"code": code, "ret_class": ret_class}
        return json.dumps(re_json)

    def wrap(self, ret_str=None):
        code = self.code
        ret_class = self.msg if not ret_str else ret_str
        return self.package(code, ret_class)

