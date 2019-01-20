from flask import Flask, request, render_template
import json
from classifier import Classifier
from exceptions import _Exception


# 各种返回值的定义
no_exception = _Exception(code=0, msg='查询成功')
class_not_found_exception = _Exception(code=1, msg='查不到此商品的分类')
format_exception = _Exception(code=2, msg='输入格式错误')
unknown_exception = _Exception(code=3, msg='未知错误')
no_data_exception = _Exception(code=4, msg='无数据输入')


# 初始化配置
app = Flask(__name__)
_classifier = Classifier('./runs/1547711022/checkpoints/')


@app.route('/')
def index():
    return render_template('SpearOfBayes.html')


@app.route('/batch_query/', methods=['POST'])
def batch_query():
    try:
        return search_by_group()
    except Exception:
        return unknown_exception.wrap()

def search_by_group():
    # 获取数据
    data = request.form.get('data')

    # 没有数据输入
    if not data:
        return no_data_exception.wrap()

    # 解析输入的json字串
    data = json.loads(data)

    # 输入格式错误
    if not data.get('commoditys'):
        format_exception.wrap()

    # 输入正确开始查询
    commoditys = data['commoditys'].split(',')
    ret_class = '--'.join(_classifier.search_list(commoditys))
    

    # 若结果不为空，返回查询结果
    if ret_class != '':
        return no_exception.wrap()
    else:
        return class_not_found_exception.wrap()



if __name__ == '__main__':
    app.run(debug=True)
