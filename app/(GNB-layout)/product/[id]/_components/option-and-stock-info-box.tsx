import ShortRow from "@/app/_components/table/short-row";
import { ShoppingItem } from "@/app/api/dto/shopping";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

interface OptionAndStockInfoBoxProps {
  data: ShoppingItem;
}

const OptionAndStockInfoBox = ({ data }: OptionAndStockInfoBoxProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">옵션/재고 설정</p>
      <div>
        <ShortRow
          label="옵션 사용"
          value={data.isOptionUsed ? "사용" : "미사용"}
          size="md"
        />

        {data.isOptionUsed && data.options && data.options.length > 0 && (
          <ShortRow label="옵션 정보" value={""} size="md">
            <div className="flex w-full flex-col gap-8 py-4">
              {/* 상품 옵션 테이블 */}
              <div className="flex flex-col gap-4">
                <h4 className="text-title-2">상품옵션</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>옵션명</TableHead>
                      <TableHead>가격</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.options.map((option, index) => (
                      <TableRow key={`option-${index}`}>
                        <TableCell size="md">
                          <span className="text-body-2">{index + 1}</span>
                        </TableCell>
                        <TableCell size="md">
                          <span className="text-body-2">
                            {option.name || "-"}
                          </span>
                        </TableCell>
                        <TableCell size="md">
                          <span className="text-body-2">
                            {option.price
                              ? `${option.price.toLocaleString()}원`
                              : "0원"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* 옵션 재고 테이블 */}
              <div className="flex flex-col gap-4">
                <h4 className="text-title-2">옵션 재고</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>옵션명</TableHead>
                      <TableHead>재고수량</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.options.map((option, index) => (
                      <TableRow key={`stock-${index}`}>
                        <TableCell size="md">
                          <span className="text-body-2">{index + 1}</span>
                        </TableCell>
                        <TableCell size="md">
                          <span className="text-body-2">
                            {option.name || "-"}
                          </span>
                        </TableCell>
                        <TableCell size="md">
                          <span className="text-body-2">
                            {option.stockCount !== null &&
                            option.stockCount !== undefined
                              ? `${option.stockCount.toLocaleString()}개`
                              : "0개"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </ShortRow>
        )}

        {/* 옵션 미사용 시 재고 관리 정보 */}
        {!data.isOptionUsed && (
          <ShortRow
            label="재고 관리"
            value={
              data.stockCount !== null
                ? `${data.stockCount.toLocaleString()}개`
                : "재고 관리 안함"
            }
            size="md"
            isLastRow
          />
        )}
      </div>
    </div>
  );
};

export default OptionAndStockInfoBox;
