import Cell from "./Cell"
import { Button, Card } from "antd"

export interface BasicProps  {
    children: Array<string>
}

const UnitTable = (props: BasicProps) => {
    const { children } = props;
    return (
        <div>
            {children!.map((item, index) => (
                <Cell value={item} key={index}>
                    <Card key={index}>
                        <Button type="primary" onClick={() => { }}>
                            {item}
                        </Button>
                    </Card>
                </Cell>
            ))}
        </div>
    );
};

export default UnitTable;
