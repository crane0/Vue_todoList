### ��ʹ��vue�Ľ��ּܣ�ʵ����һ��todolist��С����

#### ��ԭ���ּ��������޸�

- Ŀ�ģ�Ϊ����eslint���м��ʱ����Ҫ̫���ţ�

1. .eslintrc.js�У�
```
//rules�������ˣ�
rules: {
    'eol-last': 0,
    'indent': 0,	
}
```

2. .eslintignore�У�
```
*.js
*.vue
```

3. ���main.js�У�
```
//����������ע��
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {App},
  template: '<App />'
})
```

#### ������Ŀ
1. �������ݣ��ǰ��س���ȷ�ϣ�û�а�ť�����
2. ���ӵ��б��е����ݣ��������localStorage��