import jieba
import jieba.analyse
import os
from text_cnn import TextCNN
import tensorflow as tf
from tensorflow.contrib import learn
from encode_table import labels
import numpy as np

class Classifier(object):

    def __init__(self, checkpoint_dir, allow_soft_placement=True, log_device_placement=False):

        # 将数据映射为vocab
        vocab_path = os.path.join(checkpoint_dir, "..", "vocab")
        self.vocab_processor = learn.preprocessing.VocabularyProcessor.restore(vocab_path)

        checkpoint_file = tf.train.latest_checkpoint(checkpoint_dir)
        graph = tf.Graph()

        with graph.as_default():
            session_conf = tf.ConfigProto(
                allow_soft_placement=allow_soft_placement,
                log_device_placement=log_device_placement)
            self.sess = tf.Session(config=session_conf)
            with self.sess.as_default():
                # 加载已保存的图文件以及恢复变量
                saver = tf.train.import_meta_graph("{}.meta".format(checkpoint_file))
                saver.restore(self.sess, checkpoint_file)

                # 从图中通过名字获取占位符
                self.input_x = graph.get_operation_by_name("input_x").outputs[0]
                # input_y = graph.get_operation_by_name("input_y").outputs[0]
                self.dropout_keep_prob = graph.get_operation_by_name("dropout_keep_prob").outputs[0]

                # 输出层tensor
                self.predictions = graph.get_operation_by_name("output/predictions").outputs[0]

    # 分词
    def segmentation(self, word):
        # allowPos() : https://blog.csdn.net/hhtnan/article/details/77650128
        l =  jieba.analyse.extract_tags(word, topK=20, withWeight=False, allowPOS=('nz', 'n', 'vn', 'v', 'a'))
        tmp = ' ' #指定连接字符
        return tmp.join(l)

    def get_label_name(self, index):
        for key in labels:
            if labels[key] == index:
                return key
        return 'not found'

    def batch_iter(self, data, batch_size, num_epochs, shuffle=True):
        """
        创建一个数据集的批量迭代器
        """
        data = np.array(data)
        data_size = len(data)
        num_batches_per_epoch = int((len(data)-1)/batch_size) + 1
        for epoch in range(num_epochs):
            # 每一轮都打乱数据
            if shuffle:
                shuffle_indices = np.random.permutation(np.arange(data_size))
                shuffled_data = data[shuffle_indices]
            else:
                shuffled_data = data
            for batch_num in range(num_batches_per_epoch):
                start_index = batch_num * batch_size
                end_index = min((batch_num + 1) * batch_size, data_size)
                yield shuffled_data[start_index:end_index]


    '''
    search函数，输入一个商品名，过一遍模型，输出一个分类结果
    '''
    def search(self, commodity_name):
        # 对商品名进行分词
        commodity_name_segmented = [self.segmentation(commodity_name)]

        # 转化为词向量
        commodity_vector_segmented = list(self.vocab_processor.transform(list(commodity_name_segmented)))

        # 输入至模型
        prediction_encoded = self.sess.run(self.predictions, {self.input_x: commodity_vector_segmented, self.dropout_keep_prob: 1.0})

        prediction_name = self.get_label_name(prediction_encoded)

        return prediction_name


    '''
    search_list函数，输入一个商品列表，对每个商品名调用search，输出一个分类结果列表
    '''
    def search_list(self, commodity_list):
        class_list = []

        for commodity in commodity_list:
            class_list.append(self.search(commodity))

        return class_list


if __name__ == '__main__':
    classifier = Classifier(checkpoint_dir='./runs/1547711022/checkpoints/')
    print(classifier.search('A-BF/不凡 ABF936发热芯和900M-CT-K烙铁刀头 二合一'))
    print(classifier.search('老A(LAOA)S2精密螺丝刀套装手机笔记本电脑维修螺丝批组套 一字 1.2mm'))
    print(classifier.search('世达工具重型管子钳/夹钳/管道钳 8寸10寸大小管钳 轻型管钳铝合金管子钳70823 10寸--70823'))
    print(classifier.search('飞利浦三开单控开关 三联单控开关 奥瑞雅白系列 套装更优惠！ 12只整合装'))


