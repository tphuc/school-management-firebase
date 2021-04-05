import React from 'react';
import { Input, Select, Spacer, Button, Text } from '@geist-ui/react'
// interface Field {
//     name: string;
//     placeholder: string;
//     kind: Kind;
//     defaultValue?: any;
//     options?: {
//       label: string;
//       id: any;
//     }[];
//     required: boolean;
//     additionalProps?: any;
//     getValue: (item) => any;
//     getLabel: (item) => any
//   }



const DynamicForm = ({fields, header, onSumit}) => {
    const [form, setForm] = React.useState({});

    React.useEffect(() => {
        var obj = Object.assign(
            {},
            ...fields.map(s => ({
                [s.name]: s.defaultValue ? s.defaultValue : null,
            })),
        );
        setForm(obj);
    }, []);

    const renderField = (item, id) => { 
        switch(item.kind){
            case "text":
                return <> 
                <Input
                    width='100%'
                    key={id + item?.name}
                    placeholder={item.placeholder}
                    value={form[item.name] || ''} 
                    required={item.required} 
                    size='small'
                    onChange={e => {
                        setForm({
                          ...form,
                          [item.name]: e.target['value'],
                        });
                    }}
                    {...item?.additions}
                />
                <Spacer y={0.4}/>
                </>
            case "number":
                return <> 
                <Input
                 width='100%'
                 key={id + item?.name}
                    inputMode='numeric'

                    placeholder={item.placeholder}
                    value={form[item.name] || ''} 
                    required={item.required} 
                    size='small'
                    onChange={e => {
                        setForm({
                            ...form,
                            [item.name]: e.target['value'],
                        });
                    }}
                    {...item?.additions}
                />
                <Spacer y={0.4}/>
                </>
            case "select":
                return <> 
                <Select width='100%' size='small'  key={id + item?.name} placeholder={item.placeholder} onChange={val => {
                    setForm({
                        ...form,
                        [item.name]: val,
                    });
                }}
                {...item?.additions}
                >
                {item.options?.map((i, id) => <Select.Option key={id + item?.name} value={item?.getValue(i)}>{item?.getLabel(i)}</Select.Option>)}
              </Select>
              <Spacer y={0.4}/>
              </>
            
            case "multi-select":
                return <> 
                <Select size='small' multiple width='100%'  key={id + item?.name} placeholder={item.placeholder} onChange={val => {
                    setForm({
                        ...form,
                        [item.name]: val,
                    });
                }}
                {...item?.additions}
                >
                {item.options?.map((i, id) => <Select.Option key={id + item?.name} value={item?.getValue(i)}>{item?.getLabel(i)}</Select.Option>)}
              </Select>
              <Spacer y={0.4}/>
              </>
        }
    }
    return <div>
        <Text>{header}</Text>
        <form onSubmit={(e) => { e.preventDefault(); onSumit && onSumit(form)}}>
        <Spacer y={1}/>
        <div style={{flexDirection:"column", alignItems:"flex-end" , justifyContent:"flex-start"}}>
        {fields.map((item, id) => renderField(item, id))}
        </div>
        <Spacer y={2}/>
        <Button htmlType='submit' type='secondary-light' style={{width:"100%"}}>Confirm</Button>
        </form>
    </div>
}

export default DynamicForm;